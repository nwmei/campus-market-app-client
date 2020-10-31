import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import CardGrid from './CardGrid';
import { loader } from 'graphql.macro';


function HomeGrid() {

  // const query = loader('../mutations/testQuery.graphql');
  // const testQuery = useQuery(query);
  // console.log(testQuery);
    
  return (
    <div>
        <CardGrid />
    </div>
  );
}

export default HomeGrid;
