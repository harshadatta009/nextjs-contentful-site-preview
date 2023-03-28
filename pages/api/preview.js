import {client} from '../../utils/contentful'
export default async function handler(req,res){
    const {secret,title} = req.query;
    console.log("title: ", title)

    // if(secret !==process.env.CONTENTFUL_PREVIEW_SECRET || !title){
    //     return res.status(401).json({message: "Invalid token"});
    // }

    const product = await client
    .getEntries({
      content_type: 'myArticlesUpadated',
      limit: 1,
      "fields.title": title,
    })
    // console.log(product);
    if(!product.items.length){
        return res.status(401).json({message: "Invalid title"});
    }
    const pageFields = product.items[0].fields;

    res.setPreviewData({});
    res.redirect(`/library/${pageFields.title}`);

}