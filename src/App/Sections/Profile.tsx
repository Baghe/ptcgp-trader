import { useEffect, useState, type FC } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { ApiCall } from '../Functions';

export const Profile: FC = () => {
  const { initData } = retrieveLaunchParams();

  const [FormData, setFormData] = useState<any>(null);
  const [Saving, setSaving] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  function Load() {
    ApiCall("profile-get", {}, (data) => {
      if (data.Result) {
        setFormData({
          nickname: data.Data.nickname || '',
          friendCode: data.Data.friendCode || '',
          showUsername: data.Data.showUsername || true
        });
      } else {
        setFormData({
          nickname: '',
          friendCode: '',
          showUsername: true
        });
      }
    });
  }

  function Save() {
    setSaving(true);
    ApiCall("profile-set", FormData, () => {
      setSaving(false);
    });
  }

  return FormData && initData ? (
    <div className="container py-3">
      <div className="text-primary h5">Profile</div>
      <div className="card">
        <div className="card-body pt-2">
          <div className="mb-2">
            <div className="text-muted small ps-2">Nickname</div>
            <input type="text" className="form-control form-control-lg" placeholder="Ash"
              disabled={Saving}
              value={FormData.nickname} onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9_\p{L}]/gu, '');
                setFormData({ ...FormData, nickname: value })
              }} />
          </div>

          <div className="mb-2">
            <div className="text-muted small ps-2">Friend Code{FormData.friendCode?.length === 16 ? '' : ' (required)'}</div>
            <input type="text" className={"form-control form-control-lg" + (FormData.friendCode?.length === 16 ? '' : ' is-invalid')}
              placeholder="Ash"
              maxLength={19} disabled={Saving}
              value={FormData.friendCode.replace(/(\d{4})/g, '$1-').replace(/-$/, '')} onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setFormData({ ...FormData, friendCode: value })
              }} />
            <span className="small">Friend Code is required to accept trades.</span>
          </div>

          {initData.user?.username && (
            <div className="mb-2">
              <div className="text-muted small ps-2">Telegram username</div>
              <div className="form-control form-control-lg">
                {initData.user?.username}
              </div>
              <div className="form-check mt-1">
                <input className="form-check-input" type="checkbox" id="showUsername"
                  checked={FormData.showUsername}
                  onChange={(e) => setFormData({ ...FormData, showUsername: e.target.checked })} />
                <label className="form-check-label" htmlFor="showUsername">
                  Show my Telegram username to other users
                </label>
              </div>
            </div>
          )}

          <button className="btn btn-lg btn-primary w-100" onClick={Save} disabled={FormData.friendCode?.length !== 16 || Saving}>
            {Saving ? <div className="spinner-border spinner-border-sm" role="status" /> : 'Save'}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-border text-primary" role="status" />
    </div>
  )
};
