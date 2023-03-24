import PreviewBanner from '@/components/PreviewBanner'
import {client,previewClient} from '../../utils/contentful'

export default function ProductPage(props) {
  console.log(props)
  if (props.error) {
    return (
      <div>
        <h1>An Error occurred: </h1>
        <h2>{props.error}</h2>
      </div>
    )
  }

  return (
    <div>
        {props.preview && <PreviewBanner/>}
      <h1>{props.heading}</h1>
      <h2>{props.subheading}</h2>
      <p>{props.test}</p>
      {/* <p>{props.richtext.content.map((e)=>{
        return e.content[0].value
      })}</p> */}
    </div>
  )
}

export async function getStaticPaths() {
  const products = await client
    .getEntries({
      content_type: 'productReview',
    })

  const paths = products.items.map(product => ({
    params: {
      slug: product.fields.productId
    }
  }))

  console.log("paths: ", paths)

  return {
    fallback: false,
    paths,
  }
}

export async function getStaticProps(context) {
  // Get data from headless CMS
  const cli = context.preview ? previewClient : client
  const product = await cli
    .getEntries({
      content_type: 'productReview',
      limit: 1,
      "fields.productId": context.params.slug,
    })
  
  console.log("products: ", product)

  return {
    props: {
        preview: context.preview || false,
      error: !product.items.length 
        && `No product with id: ${context.params.slug}`,
      ...product?.items?.[0]?.fields
    },
  }
}
