import React from 'react';
import {useState, useEffect} from 'react'
import {useQuery } from '@apollo/client';
import HelloQuery from '../queries/Hello.graphql';

const TestComponent = ({navigateAfterLogin}) => {
  const [response, setResponse] = useState('');
  const {data} = useQuery(HelloQuery);

  useEffect(() => {
    if (data) {
      setResponse(data.hello)
    }
  }, [data]);

  return (
    <p>{response}</p>
  )
};

export default TestComponent;