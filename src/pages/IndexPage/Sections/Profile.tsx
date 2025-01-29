import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { Section, Input, Button } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';


export const Profile: FC = () => {
  const { initDataRaw } = retrieveLaunchParams();

  const [FormData, setFormData] = useState({
    nickname: '',
    friendCode: ''
  });
  const [Response, setResponse] = useState('');

  function Save() {
    fetch('https://baghe.altervista.org/bot/ptcgptrader/v1/', {
      method: 'POST',
      headers: {
        Authorization: `tma ${initDataRaw}`
      },
    }).then(response => response.json())
      .then(data => setResponse(data));
  }

  return (
    <Section header="Profile" footer="Your profile information will be visible to other users.">
      <Input
        header="Nickname"
        placeholder="Ash"
        value={FormData.nickname} onChange={(e) => {
          // [a-zA-Z0-9_] + accented characters
          const value = e.target.value.replace(/[^a-zA-Z0-9_\p{L}]/gu, '');
          setFormData({ ...FormData, nickname: value })
        }} />
      <Input
        header={"Friend Code" + (FormData.friendCode.length === 16 ? '' : ' (required)')}
        placeholder="0000-0000-0000-0000"
        maxLength={19}
        status={FormData.friendCode.length === 16 ? 'default' : 'error'}
        value={FormData.friendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} onChange={(e) => {
          // format: 0000-0000-0000-0000
          const value = e.target.value.replace(/\D/g, '');
          setFormData({ ...FormData, friendCode: value })
        }} />
      <div style={{ padding: 16 }}>
        <Button size="m" stretched onClick={Save} disabled={FormData.friendCode.length !== 16}>
          Save
        </Button>

        <pre style={{ overflow: "auto" }}>{JSON.stringify(Response, null, 2)}</pre>
      </div>
    </Section>
  );
};
