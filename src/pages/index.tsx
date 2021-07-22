/// <reference types="@emotion/react/types/css-prop" />
import tw, { css } from 'twin.macro';
import { signIn, signOut, useSession } from 'next-auth/client';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-400`}
`;

export const Page = (): JSX.Element => {
  const [session, loading] = useSession();

  if (loading) return <>loading</>;

  if (session) {
    return (
      <div css={container}>
        <main>
          <h1 tw='text-5xl font-bold'>生活お悩みカルテ</h1>
          <h3 tw='text-3xl font-bold'>{session.user.email}</h3>
          <button onClick={() => signOut()}>Logout</button>
        </main>
      </div>
    );
  }

  return (
    <div css={container}>
      <main>
        <h1 tw='text-5xl font-bold'>生活お悩みカルテ</h1>
        <button onClick={() => signIn()}>Login</button>
      </main>
    </div>
  );
};

export default Page;
