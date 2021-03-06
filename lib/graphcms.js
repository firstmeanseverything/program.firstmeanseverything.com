import { gql, GraphQLClient } from 'graphql-request'

import {
  ProgramPageQuery,
  ProgramPreviewPageQuery,
  ProgramsPathsQuery,
  SampleProgramPageQuery
} from '@/queries/program'

const graphCmsClient = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ck9l9rsch25ku01wbbnd30c1s/master',
  {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`
    }
  }
)

export default graphCmsClient

const getProgramPage = async (args, preview) =>
  await graphCmsClient.request(ProgramPageQuery, {
    stage: preview ? 'DRAFT' : 'PUBLISHED',
    ...args
  })

const getProgramPreviewPage = async (id) =>
  await graphCmsClient.request(ProgramPreviewPageQuery, { id, stage: 'DRAFT' })

const getProgramsList = async (query, args, preview) =>
  await graphCmsClient.request(query, {
    stage: preview ? 'DRAFT' : 'PUBLISHED',
    ...args
  })

const getProgramsPaths = async (args) =>
  await graphCmsClient.request(ProgramsPathsQuery, args)

const getSampleProgramPage = async (args, preview) =>
  await graphCmsClient.request(SampleProgramPageQuery, {
    stage: preview ? 'DRAFT' : 'PUBLISHED',
    ...args
  })

export {
  getProgramPreviewPage,
  getProgramPage,
  getProgramsList,
  getProgramsPaths,
  getSampleProgramPage,
  gql
}
