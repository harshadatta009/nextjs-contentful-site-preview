import PreviewBanner from "@/components/PreviewBanner";
import { client, previewClient } from "../../utils/contentful";

export default function ProductPage(props) {
  console.log(props);
  if (props.error) {
    return (
      <div>
        <h1>An Error occurred: </h1>
        <h2>{props.error}</h2>
      </div>
    );
  }

  return (
    <div>
      {props.preview && <PreviewBanner />}
      <h1>{props.title}</h1>
      <h2>{props.category}</h2>
      <p>{props.description}</p>
      <br></br>
      <h2>Updated Summary</h2> <br></br>
      <p>{props.updatedSummary}</p>
      <br></br>
      <h3>conclusion</h3>
      <p>{props.conclusion}</p>
      {/* <p>{props.richtext.content.map((e)=>{
        return e.content[0].value
      })}</p> */}
    </div>
  );
}

export async function getStaticPaths() {
  const products = await client.getEntries({
    content_type: "myArticlesUpadated",
  });

  const paths = products.items.map((product) => ({
    params: {
      slug: product.fields.title,
    },
  }));

  console.log("paths: ", paths);

  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps(context) {
  // Get data from headless CMS
  const cli = context.preview ? previewClient : client;
  const product = await cli.getEntries({
    content_type: "myArticlesUpadated",
    limit: 1,
    "fields.title": context.params.slug,
  });

  console.log("products: ", product);

  return {
    props: {
      preview: context.preview || false,
      error:
        !product.items.length && `No product with id: ${context.params.slug}`,
      ...product?.items?.[0]?.fields,
    },
  };
}
