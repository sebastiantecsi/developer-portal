// Scripts
import { getPageInfo, getPartialsAsArray } from '@/src/common/page-info';
import { getProductPaths } from '@/src/common/static-paths';
// Interfaces
import type { PageInfo, PartialData } from '@/src/interfaces/page-info';
// Components
import GenericContentPage from '@/src/layouts/GenericContentPage';

export async function getStaticPaths() {
  const productPaths = await getProductPaths();
  return {
    paths: productPaths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const pageInfo = await getPageInfo(context.params, context.preview ? context.preview : null);
  const partials = pageInfo?.partials ? await getPartialsAsArray(pageInfo.partials) : [];

  return {
    props: {
      pageInfo,
      partials,
    },
    revalidate: 600, // 10 minutes
  };
}

export default function productPage({ pageInfo, partials }: { pageInfo: PageInfo; partials: PartialData }) {
  return <GenericContentPage pageInfo={pageInfo} partials={partials} />;
}