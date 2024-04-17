const axios = require("axios");

const khaltiService = async (payload, config) => {
  try {
    if (
      !payload.return_url ||
      !payload.website_url ||
      !payload.amount ||
      !payload.purchase_order_id ||
      !payload.purchase_order_name
    ) {
      throw new Error(
        "Incomplete payload: Required fields missing(eg: return_url, website_url, amount, purchase_order_id, purchase_order_name)"
      );
    }

    const response = await axios.post(`${config.KHALTI_GATEWAY_URL}/epayment/initiate/`, payload, {
      headers: {
        Authorization: `key ${config.KHALTI_SECRET_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const khaltiCallback = async (req, config) => {
  try {
    const { pidx } = req.query;

    if (!pidx) {
      throw new Error("Something went wrong: pidx is not in the query string");
    }

    const payload = {
      pidx: pidx,
    };

    const response = await axios.post(`${config.KHALTI_GATEWAY_URL}/epayment/lookup/`, payload, {
      headers: {
        Authorization: `key ${config.KHALTI_SECRET_KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  khaltiService,
  khaltiCallback,
};
