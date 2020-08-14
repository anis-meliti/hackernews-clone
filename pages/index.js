import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';
import Link from 'next/link';

const Index = ({ stories, page }) => {
  if (stories.length === 0) return <Error statusCode={503} />;

  return (
    <Layout
      title='Hacker Next'
      description='A hacker news clone made with Nextjs'
    >
      <StoryList stories={stories} />
      <footer>
        <Link href={`/?page=${page + 1}`}>
          <a> Next page ({page + 1})</a>
        </Link>
      </footer>
      <style jsx>{`
        footer {
          padding: 1em;
        }
        footer a {
          font-weight: bold;
          color: black;
          text-decoration: none;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async ({ req, res, query }) => {
  //   console.log('Index.getInitialProps -> query', query);
  let page;
  try {
    page = Number(query.page) || 1;
    const res = await fetch(
      `https://node-hnapi.herokuapp.com/news?page=${page}`
    );
    const stories = await res.json();
    return { stories, page };
  } catch (error) {
    console.error(error);
    return { stories: [], page };
  }
};

export default Index;
