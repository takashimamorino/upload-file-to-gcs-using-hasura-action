import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import "react-quill/dist/quill.snow.css";

const ReactQuillWithNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
});

const COMMENTS = gql`
  query Comments {
    comment {
      id
      value
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($value: String!) {
    insert_comment_one(object: { value: $value }) {
      id
      value
    }
  }
`;

const TopPage: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const { data } = useQuery(COMMENTS);
  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: COMMENTS }],
  });

  const handleSubmit = (value: string) => {
    createComment({ variables: { value } });
    setValue("");
  };

  return (
    <>
      {data?.comment.map(({ id, value }) => (
        <span key={id} dangerouslySetInnerHTML={{ __html: value }} />
      ))}

      <ReactQuillWithNoSSR theme="snow" value={value} onChange={setValue} />
      <button onClick={() => handleSubmit(value)}>追加</button>
    </>
  );
};

export default TopPage;
