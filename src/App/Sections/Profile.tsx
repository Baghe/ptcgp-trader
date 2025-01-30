import { Section, Input, Button, Spinner, List, Card, Banner } from '@telegram-apps/telegram-ui';
import React, { useEffect, useState, type FC } from 'react';
import { ApiCall } from '../Functions';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

export const Profile: FC = () => {
  const [PageLoaded, setPageLoaded] = useState(false);
  const [FormData, setFormData] = useState({
    nickname: '',
    friendCode: ''
  });
  const [Saving, setSaving] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  function Load() {
    ApiCall("profile-get", {}, (data) => {
      if (data) {
        setFormData({
          nickname: data.nickname || '',
          friendCode: data.friendCode || ''
        });
        setPageLoaded(true);
      }
    });
  }

  function Save() {
    setSaving(true);
    ApiCall("profile-set", FormData, () => {
      setSaving(false);
    });
  }

  return PageLoaded ? (
    <Section header="Profile" footer="Your profile information will be visible to other users.">

      <div style={{ padding: 22 }}>
        <Input header="Nickname" placeholder="Ash" disabled={Saving}
          value={FormData.nickname} onChange={(e) => {
            const value = e.target.value.replace(/[^a-zA-Z0-9_\p{L}]/gu, '');
            setFormData({ ...FormData, nickname: value })
          }} />
        <Input
          header={"Friend Code" + (FormData.friendCode?.length === 16 ? '' : ' (required)')}
          placeholder="0000-0000-0000-0000"
          maxLength={19} disabled={Saving}
          status={FormData.friendCode?.length === 16 ? 'default' : 'error'}
          value={FormData.friendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setFormData({ ...FormData, friendCode: value })
          }} />
        <br />
        <Button size="m" stretched onClick={Save} disabled={FormData.friendCode?.length !== 16 || Saving}>
          {Saving ? <><Spinner size="s" /> Saving...</> : 'Save'}
        </Button>
      </div>
    </Section>
  ) : (
    <Section header="Profile">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
        <Spinner size="l" />
      </div>
    </Section>
  )
};
