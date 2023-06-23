import { GraphQLClient, gql } from "graphql-request";
import Card from "./components/Card";
const graphcms = new GraphQLClient(
  `https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/${process.env.GRAPHCMS_TOKEN}/master`
);

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

// export async function getServerSideProps() {
//   const { posts } = await graphcms.request(QUERY);
//   return {
//     props: {
//       posts: [],
//     },
//     revalidate: 10,
//   };
// }

export default async function Home() {
  const { posts } = await graphcms.request(QUERY);
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <Test/> */}
        <div className="flex text-white">
          {posts.map((post) => {
            return <Card title={post.title} author={post.author} key={post.id} />;
          })}
        </div>
      </main>
    </div>
  );
}
