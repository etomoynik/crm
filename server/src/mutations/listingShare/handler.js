import gql from "graphql-tag";

import { sendMail, GMAIL_USER } from "../../mailer";

const LISTING_QUERY = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      id
      order {
        title
        pictures {
          items {
            shareUrl
          }
        }
      }
    }
  }
`;

module.exports = async (event, ctx) => {
  let response = null;

  try {
    response = await ctx.api.gqlRequest(LISTING_QUERY, { id: event.data.id });
  } catch (e) {
    return { data: { success: false } };
  }

  try {
    const {
      listing: { order },
    } = response;

    console.log("Sending email...");

    await sendMail({
      from: GMAIL_USER,
      to: event.data.email,
      subject: `Share listing with order "${order.title}"`,
      html: `Listing with order title "${order.title}"<br /><img src="${order.pictures.items[0].shareUrl}?download=true" />`,
    });
  } catch (e) {
    return { data: { success: false } };
  }

  return { data: { success: true } };
};
