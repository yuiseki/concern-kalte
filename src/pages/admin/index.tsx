/// <reference types="@emotion/react/types/css-prop" />
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import tw, { css } from 'twin.macro';
import { FaLock, FaUser, FaCommentDots, FaUserFriends } from 'react-icons/fa';

const container = css`
  ${tw`mx-auto m-4 p-4 rounded bg-gray-400`}
`;

export const Page: React.VFC = () => {
  return (
    <>
      <Head>
        <title>Concern Kalte - Admin</title>
      </Head>
      <div css={container}>
        <h1 tw='text-5xl font-bold my-4'>
          Concern Kalte - Admin
          <FaLock tw='inline-block' />
        </h1>
        <main>
          <ol tw='text-2xl'>
            <li>
              <Link href='/admin/users'>
                <>
                  <FaUser tw='inline-block' />
                  Users
                </>
              </Link>
            </li>
            <li>
              <Link href='/admin/concerns'>
                <>
                  <FaCommentDots tw='inline-block' />
                  Concerns
                </>
              </Link>
            </li>
            <li>
              <Link href='/admin/teams'>
                <>
                  <FaUserFriends tw='inline-block' />
                  Teams
                </>
              </Link>
            </li>
          </ol>
        </main>
      </div>
    </>
  );
};

export default Page;
