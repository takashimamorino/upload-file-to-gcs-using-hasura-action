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

const FILE_IPLOAD = gql`
  mutation FileUpload($value: String!) {
    fileUpload(file: $value) {
      filePath
    }
  }
`;

const TopPage: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const { data } = useQuery(COMMENTS);
  const [fileUpload] = useMutation(FILE_IPLOAD);

  const handleSubmit = (value: string) => {
    fileUpload({ variables: { value }, refetchQueries: [{ query: COMMENTS }] });
    setValue("");
  };

  return (
    <>
      {data?.comment.map(({ id, value }) => (
        <span key={id} dangerouslySetInnerHTML={{ __html: value }} />
      ))}
      <p>test</p>

      <ReactQuillWithNoSSR theme="snow" value={value} onChange={setValue} />
      <button onClick={() => handleSubmit(value)}>追加</button>
    </>
  );
};

export default TopPage;
