import type { RegisterController } from '../hooks/useRegisterController';
import RegisterFields from './RegisterFields';
import RegisterOtpForm from './RegisterOtpForm';
import RegisterThemesSelection from './RegisterThemesSelection';

export default function RegisterForm({ state }: { state: RegisterController }) {
    if (state.step === 'otp') {
        return <RegisterOtpForm state={state} />;
    }
    if (state.step === 'themes') {
        return <RegisterThemesSelection state={state} />;
    }
    return <RegisterFields state={state} />;
}

