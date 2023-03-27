import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { RestLink } from 'apollo-link-rest';

// const uri = 'https://wordsapiv1.p.rapidapi.com/words/%7Bword%7D'; // <-- add the URL of the GraphQL server here
const uri = new RestLink({ uri: "https://api.dictionaryapi.dev/api/v2/entries/en/" });

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: uri,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
