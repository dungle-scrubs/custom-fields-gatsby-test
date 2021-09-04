/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// const path = require("path")

// const query = `
// {
//   allShopifyProduct {
//     edges {
//       node {
//         id
//         handle
//       }
//     }
//   }
// }
// `
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const res = await graphql(query)
//   res.data.allShopifyProduct.edges.map(edge => {
//       console.log("edge ", edge)
//     createPage({
//       path: `/shop/${edge.node.handle}/`,
//       component: path.resolve("./src/templates/product.js"),
//       context: {
//         id: edge.node.id,
//       },
//     })
//   })
// }

exports.onCreateNode = async ({
    node, // the node that was just created
    actions: { createNode},
    createNodeId,
    getNode,
    getCache,
}) => {
    if(node?.internal?.type === "ShopifyProductMetafield"){
        if(node?.key === "single-image"){
            if(node?.value && node?.value !== null){
                const imgUrl = node?.value.split('"')[1];
                const altText = node?.value.split('"')[3] || null;
                const fileNode = await createRemoteFileNode({
                    url: imgUrl,
                    parentNodeId: node.id,
                    createNode,
                    createNodeId,
                    getCache,
                })
    
                node.images= [];
    
                if (fileNode) {
                    node.images.push({
                        subfield: "single-image",
                        alt: altText,
                        url: imgUrl,
                        localFile___NODE : fileNode.id
                    })
                }
            }

        }
        else if(node?.key === "image-repeater"){
            const repeater_image = JSON.parse(node?.value);
            node.images= [];
            repeater_image.forEach(async (repeat_img) => {
                const imgUrl = repeat_img["image-repeater"].split('"')[1];
                const altText = repeat_img["image-repeater"].split('"')[3] || null;
                const fileNode = await createRemoteFileNode({
                    url: imgUrl,
                    parentNodeId: node.id,
                    createNode,
                    createNodeId,
                    getCache,
                })

                if (fileNode) {
                    node.images.push({
                        subfield: "image-repeater",
                        alt: altText,
                        url: imgUrl,
                        localFile___NODE : fileNode.id
                    })
                }
            });
        }
        else if(node?.key === "repeater-with-some-images"){
            const repeater_image = JSON.parse(node?.value);
            node.images = [];
            repeater_image.forEach(async (repeat_img) => {
                const imgUrl = repeat_img["image"].split('"')[1];
                const altText = repeat_img["image"].split('"')[3] || null;
                const fileNode = await createRemoteFileNode({
                    url: imgUrl,
                    parentNodeId: node.id,
                    createNode,
                    createNodeId,
                    getCache,
                })

                if (fileNode) {
                    node.images.push({
                        subfield: "image",
                        alt: altText,
                        url: imgUrl,
                        localFile___NODE : fileNode.id
                    })
                }
            });
        }
        else if(node?.key === "three-level-repeater"){
            const repeater_image = JSON.parse(node?.value);
            node.images = [];

            repeater_image.forEach(async (repeat_img) => {
                if(repeat_img["level-two-repeater"] && repeat_img["level-two-repeater"] !== null){
                    repeat_img["level-two-repeater"].forEach(async (repeat) => {
                        let imgUrl;
                        let fileNode;
                        let altText;
                        if(repeat["lvl-3-image-1"] && repeat["lvl-3-image-1"] !== null){
                            imgUrl = repeat["lvl-3-image-1"].split('"')[1];
                            altText = repeat["lvl-3-image-1"].split('"')[3] || null;
                            fileNode = await createRemoteFileNode({
                                url: imgUrl,
                                parentNodeId: node.id,
                                createNode,
                                createNodeId,
                                getCache,
                            })
            
                            if (fileNode) {
                                node.images.push({
                                    subfield: "lvl-3-image-1",
                                    alt: altText,
                                    url: imgUrl,
                                    localFile___NODE : fileNode.id
                                })
                            }
                        }

                        if(repeat["lvl-3-image-2"] && repeat["lvl-3-image-2"] !== null){
                            imgUrl = repeat["lvl-3-image-2"].split('"')[1];
                            altText = repeat["lvl-3-image-2"].split('"')[3] || null;
                            fileNode = await createRemoteFileNode({
                                url: imgUrl,
                                parentNodeId: node.id,
                                createNode,
                                createNodeId,
                                getCache,
                            })
            
                            if (fileNode) {
                                node.images.push({
                                    subfield: "lvl-3-image-2",
                                    alt: altText,
                                    url: imgUrl,
                                    localFile___NODE : fileNode.id
                                })
                            }
                        }

                    })
                }

                let imgUrl;
                let fileNode;
                let altText;
                if(repeat_img["lvl-2-image-1"] && repeat_img["lvl-2-image-1"] !== null){
                    imgUrl = repeat_img["lvl-2-image-1"].split('"')[1];
                    altText = repeat_img["lvl-2-image-1"].split('"')[3] || null;
                    fileNode = await createRemoteFileNode({
                        url: imgUrl,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
                        getCache,
                    })
    
                    if (fileNode) {
                        node.images.push({
                            subfield: "lvl-2-image-1",
                            alt: altText,
                            url: imgUrl,
                            localFile___NODE : fileNode.id
                        })
                    }
                }

                if(repeat_img["lvl-2-image-2"] && repeat_img["lvl-2-image-2"] !== null){
                    imgUrl = repeat_img["lvl-2-image-2"].split('"')[1];
                    altText = repeat_img["lvl-2-image-2"].split('"')[3] || null;
                    fileNode = await createRemoteFileNode({
                        url: imgUrl,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
                        getCache,
                    })
    
                    if (fileNode) {
                        node.images.push({
                            subfield: "lvl-2-image-2",
                            alt: altText,
                            url: imgUrl,
                            localFile___NODE : fileNode.id
                        })
                    }
                }

                if(repeat_img["lvl-2-image-no-alt"] && repeat_img["lvl-2-image-no-alt"] !== null){
                    imgUrl = repeat_img["lvl-2-image-no-alt"];
                    fileNode = await createRemoteFileNode({
                        url: imgUrl,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
                        getCache,
                    })
    
                    if (fileNode) {
                        node.images.push({
                            subfield: "lvl-2-image-no-alt",
                            alt: null,
                            url: imgUrl,
                            localFile___NODE : fileNode.id
                        })
                    }
                }

            });
        }
        else if(node?.key === "image-no-alt"){
            node.images= [];
            imgUrl = node?.value;
            if(imgUrl && imgUrl !== null){
                fileNode = await createRemoteFileNode({
                    url: imgUrl,
                    parentNodeId: node.id,
                    createNode,
                    createNodeId,
                    getCache,
                })
    
                if (fileNode) {
                    node.images.push({
                        subfield: "image-no-alt",
                        alt: null,
                        url: imgUrl,
                        localFile___NODE : fileNode.id
                    })
                }
            }
        }
    }
}