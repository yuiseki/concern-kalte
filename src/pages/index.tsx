/// <reference types="@emotion/react/types/css-prop" />
import tw, { css } from 'twin.macro';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-400`}
`;

export const Page = (): JSX.Element => {
  return (
    <div css={container}>
      <main>
        <h1 tw='text-5xl font-bold'>Concern Kalte</h1>
        <a href='/api/auth/login'>Login</a>
      </main>
    </div>
  );
};

export default Page;
