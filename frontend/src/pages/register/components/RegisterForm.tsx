import type { RegisterController } from '../hooks/useRegisterController';
import RegisterFields from './RegisterFields';
import RegisterOtpForm from './RegisterOtpForm';

export default function RegisterForm({ state }: { state: RegisterController }) {
    if (state.step === 'otp') {
        return <RegisterOtpForm state={state} />;
    }
    return <RegisterFields state={state} />;
}
