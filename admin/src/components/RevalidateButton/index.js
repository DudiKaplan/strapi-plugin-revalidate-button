import React, { memo, useEffect } from "react";
import { useIntl } from "react-intl";
import { Button } from "@strapi/design-system";
import { Play } from "@strapi/icons";
import { useQuery } from "react-query";

import {
  useCMEditViewDataManager,
  useFetchClient,
} from "@strapi/helper-plugin";
import { useNotification } from "@strapi/helper-plugin";

import getTrad from "../../utils/getTrad";

const RevalidateButton = () => {
  const { modifiedData } = useCMEditViewDataManager();
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const { get } = useFetchClient();
  const QUERY_KEY = "webhooks";

  const {
    isLoading: isWebhooksLoading,
    data: webhooks,
    error: webhooksError,
  } = useQuery(QUERY_KEY, async () => {
    const {
      data: { data },
    } = await get("/admin/webhooks");
    return data;
  });

  const handleClick = async (event) => {
    try {
      const webhook = webhooks.find((item) => item.name === "Revalidate");
      await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ entry: { Slug: modifiedData?.Slug } }),
      });
      toggleNotification({
        type: "success",
        message: {
          id: "notification.success.revalidate",
          defaultMessage: `Revalidate request send for Slug: ${modifiedData?.Slug} `,
        },
      });
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: {
          id: "notification.error.revalidate",
          defaultMessage: `Revalidate field `,
        },
      });
    }
  };

  useEffect(() => {
    if (webhooksError) {
      toggleNotification({
        type: "warning",
        message: {
          id: "notification.error.revalidate",
          defaultMessage: `Error load ${QUERY_KEY} `,
        },
      });
    }
  }, [webhooksError]);

  return !isWebhooksLoading && modifiedData.publishedAt ? (
    <Button
      onClick={handleClick}
      size="M"
      startIcon={<Play />}
      variant="main"
      style={{ width: "100%" }}
    >
      {formatMessage({
        id: getTrad("form.button.revalidate"),
        defaultMessage: "Revalidate",
      })}
    </Button>
  ) : (
    <></>
  );
};

export default memo(RevalidateButton);
