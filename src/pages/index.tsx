/// <reference types="@emotion/react/types/css-prop" />
import tw, { css } from 'twin.macro';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Session } from 'next-auth';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-400`}
`;

const Loading: React.VFC = () => {
  return <>loading</>;
};

const SignedIn: React.VFC<{ session: Session }> = ({
  session,
}: {
  session: Session;
}) => {
  return (
    <>
      <h1 tw='text-5xl font-bold'>生活お悩みカルテ</h1>
      <h3 tw='text-3xl font-bold'>{session.user.email}</h3>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
};

const SignedOut: React.VFC = () => {
  return (
    <>
      <h1 tw='text-5xl font-bold'>生活お悩みカルテ</h1>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export const Page: React.VFC = () => {
  const [session, loading] = useSession();

  if (loading) return <>loading</>;

  if (session) {
    return (
      <div css={container}>
        <main>
          {loading && <Loading />}
          {!loading && session && <SignedIn session={session} />}
          {!loading && !session && <SignedOut />}
        </main>
      </div>
    );
  }

  return (
    <div css={container}>
      <main></main>
    </div>
  );
};

export default Page;
