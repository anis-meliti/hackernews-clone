import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';

const Index = ({ stories }) => {
  if (stories.length === 0) return <Error statusCode={503} />;

  return (
    <Layout
      title='Hacker Next'
      description='A hacker news clone made with Nextjs'
    >
      <StoryList stories={stories} />
    </Layout>
  );
};

Index.getInitialProps = async ({ req, res, query }) => {
  console.log('Index.getInitialProps -> query', query);

  try {
    const res = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
    const stories = await res.json();
    return { stories };
  } catch (error) {
    console.error(error);
    return { stories: [] };
  }
};

export default Index;
