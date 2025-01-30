import { Section, Button, Spinner } from '@telegram-apps/telegram-ui';
import { useEffect, useState, type FC } from 'react';
import { ApiCall } from '../Functions';

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

      <div className="container py-3">
        <div className="mb-2">
          <div className="text-muted small ps-3">Nickname</div>
          <input type="text" className="form-control form-control-lg rounded-4 border-2" placeholder="Ash"
            disabled={Saving}
            value={FormData.nickname} onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9_\p{L}]/gu, '');
              setFormData({ ...FormData, nickname: value })
            }} />
        </div>

        <div className="mb-2">
          <div className="text-muted small ps-3">Friend Code{FormData.friendCode?.length === 16 ? '' : ' (required)'}</div>
          <input type="text" className={"form-control form-control-lg rounded-4 border-2" + (FormData.friendCode?.length === 16 ? '' : ' is-invalid')}
            placeholder="Ash"
            maxLength={19} disabled={Saving}
            value={FormData.friendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...FormData, friendCode: value })
            }} />
        </div>

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
