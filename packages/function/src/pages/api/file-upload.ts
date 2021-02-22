import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { file } = req.body.input

  const CREATE_COMMENT = `
    mutation CreateComment($value: String!) {
      insert_comment_one(object: { value: $value }) {
        id
        value
      }
    }
  `;

  const variables = { value: file };
  await fetch(
    "http://localhost:8080/v1/graphql",
    {
      method: 'POST',
      body: JSON.stringify({
        query: CREATE_COMMENT,
        variables
      })
    }
  )
  .then(res => res.json())
  .then(res => console.log(res.data));
}
