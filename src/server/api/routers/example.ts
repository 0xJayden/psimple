import { z } from "zod";
import sgMail from "@sendgrid/mail";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
// import secretItemsData from "~/secretItems.json";

const getShipping = async (
  recipient: {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    country: string;
    state: string;
    zip: number;
    phone: string;
  },
  items: any
) => {
  const result = await fetch(`https://api.printful.com/shipping/rates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: {
        address1: recipient.address1,
        city: recipient.city,
        country_code: recipient.country,
        state_code: recipient.state,
        zip: recipient.zip,
        phone: recipient.phone,
      },
      items,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
  return result.result;
};

const getTax = async (recipient: {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  country: string;
  state: string;
  zip: number;
  phone: string;
}) => {
  const result = await fetch(`https://api.printful.com/tax/rates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipient: {
        country_code: recipient.country,
        state_code: recipient.state,
        city: recipient.city,
        zip: recipient.zip,
      },
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
  return result.result.rate;
};

export const getItems = async (
  input: {
    id?: number | undefined;
    image?: string | undefined;
    name?: string;
    price?: string;
    quantity: number;
    variant_id?: number | undefined;
  }[]
) => {
  console.log(input, "input");
  let items: Array<any> = [];
  // let specialItems: Array<any> = [];
  let metadataItems: Array<any> = [];

  for (const item of input) {
    console.log(item, "item");

    // if (!item.id) {
    //   if (item.name === "Blues") {
    //     const blues = secretItemsData[0];
    //     if (!blues) break;
    //     blues.quantity = item.quantity;
    //     specialItems.push(blues);
    //     metadataItems.push({
    //       name: blues.name,
    //       quantity: blues.quantity,
    //     });
    //   } else if (item.name === "Reds") {
    //     const reds = secretItemsData[1];
    //     if (!reds) break;
    //     reds.quantity = item.quantity;
    //     specialItems.push(reds);
    //     metadataItems.push({
    //       name: reds.name,
    //       quantity: reds.quantity,
    //     });
    //   } else if (item.name === "Purples") {
    //     const purples = secretItemsData[2];
    //     if (!purples) break;
    //     purples.quantity = item.quantity;
    //     specialItems.push(purples);
    //     metadataItems.push({
    //       name: purples.name,
    //       quantity: purples.quantity,
    //     });
    //   } else if (item.name === "Golds") {
    //     const golds = secretItemsData[3];
    //     if (!golds) break;
    //     golds.quantity = item.quantity;
    //     specialItems.push(golds);
    //     metadataItems.push({
    //       name: golds.name,
    //       quantity: golds.quantity,
    //     });
    //   }
    //  } else {

    if (!item.id) break;

    let id = item.id.toString();
    const result = await fetch(
      `https://api.printful.com/store/variants/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err, "err");
        return err;
      });
    console.log(result, "result");
    items.push(result.result);
    metadataItems.push({
      // id: item.id,
      name: item.name,
      unit_amount: {
        currency_code: "USD",
        value: item.price,
      },
      quantity: item.quantity,
      description: item.id,
    });
  }
  console.log(items, "items");
  // console.log(specialItems, "specialItems");
  return { items, metadataItems };
};

const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com",
};

async function generateAccessToken() {
  const auth = Buffer.from(
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");
  const response = await fetch(`${baseURL.production}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
}

export const exampleRouter = createTRPCRouter({
  getItems: publicProcedure.query(async () => {
    const result = await fetch(
      "https://api.printful.com/store/products?limit=20",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }),
  getItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await fetch(
        `https://api.printful.com/store/products/${input.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err;
        });
      return result;
    }),
  getCountries: publicProcedure.query(async () => {
    const result = await fetch("https://api.printful.com/tax/countries", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    return result;
  }),
  getOrderDetails: publicProcedure
    .input(
      z.object({
        recipient: z.object({
          firstName: z.string(),
          lastName: z.string(),
          address1: z.string(),
          city: z.string(),
          country: z.string(),
          state: z.string(),
          zip: z.number(),
          phone: z.string(),
          email: z.string().email({ message: "Invalid email" }),
        }),
        items: z.array(
          z.object({
            id: z.number().optional(),
            image: z.string().optional(),
            name: z.string(),
            price: z.string(),
            quantity: z.number(),
            variant_id: z.number().optional(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      const { items, metadataItems } = await getItems(input.items);

      let shippingItems = [];
      let taxAmount = 0;

      const tax = await getTax(input.recipient);
      console.log(tax, "tax");

      for (const item of metadataItems) {
        item.tax = {
          currency_code: "USD",
          value: (+tax * item.unit_amount.value).toFixed(2).toString(),
        };
        taxAmount += item.tax.value * item.quantity;
        console.log(item, "item");
      }
      console.log(metadataItems, "metadataItems");

      for (const item of items) {
        // let quantity = 1;
        for (const inputItem of input.items) {
          if (item.id === inputItem.id) {
            item.quantity = inputItem.quantity;
          }
        }
        shippingItems.push({
          id: item.id,
          variant_id: item.variant_id,
          quantity: item.quantity,
        });
      }

      console.log(items, "items with quantity");
      const shippingNeed = await getShipping(input.recipient, shippingItems);
      console.log(shippingNeed, "shipping");

      const orderAmount = items.reduce((acc, item) => {
        return acc + +item.retail_price * item.quantity;
      }, 0);

      if (orderAmount === 0) {
        throw new Error("Order amount cannot be 0");
      }

      let shipping = 10;

      if (orderAmount >= 100) shipping = 0;

      const trueFinalAmount = (orderAmount + shipping + taxAmount).toFixed(2);

      const finalAmount = +(orderAmount + shipping + taxAmount).toFixed(0);

      console.log(finalAmount, "finalAmount");

      if (finalAmount === 0.0 || !finalAmount) {
        throw new Error("Order amount cannot be 0");
      }

      const data = {
        shipping,
        tax: taxAmount,
        orderAmount,
        trueFinalAmount,
        finalAmount,
        metadataItems,
      };

      return data;
    }),
  createOrder: publicProcedure
    .input(
      z.object({
        recipient: z.object({
          firstName: z.string(),
          lastName: z.string(),
          address1: z.string(),
          city: z.string(),
          country: z.string(),
          state: z.string(),
          zip: z.number(),
          phone: z.string(),
          email: z.string().email({ message: "Invalid email" }),
        }),
        items: z.array(
          z.object({
            id: z.number().optional(),
            image: z.string().optional(),
            name: z.string(),
            price: z.string(),
            quantity: z.number(),
            variant_id: z.number().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const { items, metadataItems } = await getItems(input.items);

      let shippingItems = [];
      let taxAmount = 0;

      const tax = await getTax(input.recipient);
      console.log(tax, "tax");

      for (const item of metadataItems) {
        item.tax = {
          currency_code: "USD",
          value: (+tax * item.unit_amount.value).toFixed(2).toString(),
        };
        taxAmount += item.tax.value * item.quantity;
        console.log(item, "item");
      }
      console.log(metadataItems, "metadataItems");

      for (const item of items) {
        // let quantity = 1;
        for (const inputItem of input.items) {
          if (item.id === inputItem.id) {
            item.quantity = inputItem.quantity;
          }
        }
        shippingItems.push({
          id: item.id,
          variant_id: item.variant_id,
          quantity: item.quantity,
        });
      }

      const shippingNeed = await getShipping(input.recipient, shippingItems);

      const orderAmount = items.reduce((acc, item) => {
        return acc + +item.retail_price * item.quantity;
      }, 0);

      if (orderAmount === 0) {
        throw new Error("Order amount cannot be 0");
      }

      let shipping = 10;

      if (orderAmount >= 100) shipping = 0;

      const trueFinalAmount = (orderAmount + shipping + taxAmount).toFixed(2);

      console.log(parseFloat(trueFinalAmount), "float trueFinalAmount");
      console.log(parseInt(trueFinalAmount), "int trueFinalAmount");

      const finalAmount = (orderAmount + shipping + taxAmount).toFixed(0);

      console.log(finalAmount, "finalAmount");

      if (finalAmount === 0.0 || !finalAmount) {
        throw new Error("Order amount cannot be 0");
      }

      const accessToken = await generateAccessToken();
      const url = `${baseURL.production}/v2/checkout/orders`;

      const res = fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: trueFinalAmount.toString(),
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: orderAmount.toString(),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: shipping.toString(),
                  },
                  tax_total: {
                    currency_code: "USD",
                    value: taxAmount.toFixed(2).toString(),
                  },
                },
              },
              items: metadataItems,
            },
          ],
        }),
      }).then(async (response) => {
        const json = await response.json();
        console.log(json, "data");
        return json;
      });

      return res;
    }),
  orderItems: publicProcedure
    .input(
      z.object({
        cart: z.array(
          z.object({
            id: z.number().optional(),
            image: z.string().optional(),
            name: z.string(),
            price: z.string(),
            quantity: z.number(),
            variant_id: z.number().optional(),
          })
        ),
        payer: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const { items } = await getItems(input.cart);

      for (const item of items) {
        // add quantity to item
        item.quantity = input.cart.find(
          (inputItem) => inputItem.id === item.id
        )?.quantity;

        // uppercase thread colors *Shouldn't have to do this, email printful about this*
        const threadColorsExist = item.options.find(
          (option: any) => option.id === "thread_colors"
        );
        console.log(threadColorsExist, "threadColorsExist");
        const threadColorsChestCenterExist = item.options.find(
          (option: any) => option.id === "thread_colors_chest_center"
        );
        console.log(
          threadColorsChestCenterExist,
          "threadColorsChestCenterExist"
        );
        const itemThreadColorOutsideLeftExist = item.options.find(
          (option: any) => option.id === "thread_colors_outside_left"
        );
        console.log(
          itemThreadColorOutsideLeftExist,
          "itemThreadColorOutsideLeftExist"
        );

        if (threadColorsExist) {
          let newValues: Array<string> = [];

          threadColorsExist.value.forEach((value: string) => {
            newValues.push(value.toUpperCase());
          });

          threadColorsExist.value = newValues;
        }

        if (threadColorsChestCenterExist) {
          let newValues: Array<string> = [];

          threadColorsChestCenterExist.value.forEach((value: string) => {
            newValues.push(value.toUpperCase());
          });

          threadColorsChestCenterExist.value = newValues;
        }

        if (itemThreadColorOutsideLeftExist) {
          let newValues: Array<string> = [];

          itemThreadColorOutsideLeftExist.value.forEach((value: string) => {
            newValues.push(value.toUpperCase());
          });

          itemThreadColorOutsideLeftExist.value = newValues;
        }
      }

      const name = `${input.payer.firstName} ${input.payer.lastName}`;

      const recipient = {
        name,
        address1: input.payer.address1,
        city: input.payer.city,
        country: input.payer.country,
        state: input.payer.state,
        zip: +input.payer.zip,
        phone: input.payer.phone,
        email: input.payer.email,
      };

      try {
        const result = await fetch(`https://api.printful.com/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient,
            items,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            return data;
          })
          .catch((err) => {
            return err;
          });

        console.log(result, "result");

        return { result };
      } catch (error) {
        console.log(error, "error");
        return { error };
      }
    }),
  captureOrder: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const accessToken = await generateAccessToken();
      const url = `${baseURL.production}/v2/checkout/orders/${input}/capture`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      console.log(data, "data");
      return data;
    }),
  sendEmail: publicProcedure
    .input(
      z.object({
        to: z.string().email({ message: "Invalid email" }),
        from: z.string(),
        subject: z.string(),
        html: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      sgMail.setApiKey(
        process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : ""
      );

      const { to, from, subject, html } = input;

      const msg = {
        to,
        from,
        subject,
        html,
      };

      try {
        const result = await sgMail.send(msg);
        return { result };
      } catch (error) {
        console.log(error, "error");
        return { error };
      }
    }),
  // createPaymentIntent: publicProcedure
  //   .input(
  //     z.object({
  //       recipient: z.object({
  //         name: z.string(),
  //         address1: z.string(),
  //         city: z.string(),
  //         country: z.string(),
  //         state: z.string(),
  //         zip: z.number(),
  //         phone: z.string(),
  //         email: z.string().email({ message: "Invalid email" }),
  //       }),
  //       items: z.array(
  //         z.object({
  //           id: z.number().optional(),
  //           image: z.string().optional(),
  //           name: z.string(),
  //           price: z.string(),
  //           quantity: z.number(),
  //           variant_id: z.number().optional(),
  //         })
  //       ),
  //     })
  //   )
  //   .mutation(async ({ input }) => {
  //     // const country = await getCountry();
  //     const { items, metadataItems } = await getItems(input.items);

  //     let shippingItems = [];

  //     for (const item of items) {
  //       // let quantity = 1;
  //       for (const inputItem of input.items) {
  //         if (item.id === inputItem.id) {
  //           item.quantity = inputItem.quantity;
  //         }
  //       }
  //       shippingItems.push({
  //         id: item.id,
  //         variant_id: item.variant_id,
  //         quantity: item.quantity,
  //       });
  //     }

  //     console.log(items, "items with quantity");
  //     const shippingNeed = await getShipping(input.recipient, shippingItems);
  //     console.log(shippingNeed, "shipping");

  //     const tax = await getTax(input.recipient);
  //     console.log(tax, "tax");

  //     const orderAmount = items.reduce((acc, item) => {
  //       return acc + +item.retail_price * item.quantity;
  //     }, 0);

  //     // const specialItemsAmount = specialItems.reduce((acc, item) => {
  //     //   return acc + +item.price * item.quantity;
  //     // }, 0);

  //     console.log(orderAmount, "orderAmount");
  //     // console.log(specialItemsAmount, "specialItemsAmount");

  //     if (orderAmount === 0) {
  //       throw new Error("Order amount cannot be 0");
  //     }

  //     let shipping = 10;

  //     // const finalOrderAmount = orderAmount + specialItemsAmount;

  //     if (orderAmount >= 100) shipping = 0;

  //     const taxAmount = orderAmount * +tax;
  //     console.log(taxAmount, "taxAmount");

  //     const trueFinalAmount = (orderAmount + shipping + taxAmount).toFixed(2);

  //     console.log(parseFloat(trueFinalAmount), "float trueFinalAmount");
  //     console.log(parseInt(trueFinalAmount), "int trueFinalAmount");

  //     const finalAmount = (orderAmount + shipping + taxAmount).toFixed(0);

  //     console.log(finalAmount, "finalAmount");

  //     if (finalAmount === 0.0 || !finalAmount) {
  //       throw new Error("Order amount cannot be 0");
  //     }

  //     // const paymentIntent = await stripe.paymentIntents.create({
  //     //   amount: (trueFinalAmount * 100).toFixed(0),
  //     //   currency: "usd",
  //     //   automatic_payment_methods: {
  //     //     enabled: true,
  //     //   },
  //     //   metadata: {
  //     //     items: JSON.stringify(metadataItems),
  //     //     recipient: JSON.stringify(input.recipient),
  //     //   },
  //     // });

  //     return {
  //       // clientSecret: paymentIntent.client_secret,
  //       shipping,
  //       tax: taxAmount,
  //       orderAmount,
  //       trueFinalAmount,
  //       finalAmount,
  //     };
  //   }),
  // createOrder: publicProcedure
  //   .input(
  //     z.object({
  //       recipient: z.object({
  //         name: z.string(),
  //         address1: z.string(),
  //         city: z.string(),
  //         state_code: z.string(),
  //         country_code: z.string(),
  //         zip: z.number(),
  //         phone: z.string(),
  //         email: z.string(),
  //       }),
  //       items: z.array(
  //         z.object({
  //           id: z.number(),
  //           variant_id: z.number(),
  //           quantity: z.number(),
  //           // value: z.string(),
  //         })
  //       ),
  //     })
  //   )
  // .mutation(async ({ input }) => {
  //   const items = await getItems(input.items);

  //   const result = await fetch(`https://api.printful.com/orders`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${process.env.API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       recipient: input.recipient,
  //       items,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  //   return result;
  // }),
});
