import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';
import { showStatus } from '../../utilities/ShowStatus';
import { useState } from 'react';

export default function EmailVerified({ oobCode }) {
  const { applyCode, currentUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [status, setStatus] = useState(currentUser.emailVerified);

  async function handleEmailVerification() {
    try {
      setLoading(true);
      await applyCode(oobCode);
      setStatus(currentUser.emailVerified);
      showStatus('Your email address was successfully verified', setSuccess);
    } catch (error) {
      showStatus('Unable to verify email', setError);
    }
    setLoading(false);
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 mb-3 text-center">
            Account Verification<span className="text-emerald-900">.</span>
          </h1>
          {error && <p className="text-red-700 text-md">{error}</p>}
          {success && <p className="text-green-700 text-md">{success}</p>}
          <div className="grid pt-2 gap-3">
            <p className="text-slate-200 text-md">
              Dear, {currentUser.displayName}
            </p>
            {status ? (
              <p className="text-slate-200 text-sm">
                Thank you, your email has been verified. You can now start
                purchasing items from our website. Go wild!
              </p>
            ) : (
              <p className="text-slate-200 text-sm">
                Please click on the email verification button below to verify
                your email address. Thank you.
              </p>
            )}
            <Link className="text-blue-700" to="/dashboard">
              Back to Dashboard
            </Link>
            <div className="flex justify-center">
              <button
                disabled={loading || status}
                onClick={handleEmailVerification}
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] my-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
              >
                Verify Email
              </button>
            </div>
            <p className="text-slate-200 text-sm text-center">
              Thanks for choosing Solesteals. We won&apos;t disappoint!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

EmailVerified.propTypes = {
  oobCode: PropTypes.string.isRequired,
};
