import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

export function ApiCall(Action: string, Values = {}, Callback: (data: any) => void) {
  const { initDataRaw } = retrieveLaunchParams();
  fetch('https://baghe.altervista.org/bot/ptcgptrader/v1/', {
    method: 'POST',
    headers: {
      Authorization: `tma ${initDataRaw}`
    },
    body: JSON.stringify({
      Action: Action,
      ...Values
    })
  }).then(response => response.json())
    .then(data => {
      if (data.Result) {
        Callback(data.Data);
      } else {
        Callback(false);
      }
    });
}