import { useCallback } from 'react';
import { Button } from '@signozhq/ui/button';
import { LifeBuoy } from '@signozhq/icons';

import signozBrandLogoUrl from '@/assets/samprk-logo-white.png';

import './AuthHeader.styles.scss';

function AuthHeader(): JSX.Element {
	const handleGetHelp = useCallback((): void => {
		window.open('https://samparksoftwares.com/contact-us/', '_blank');
	}, []);

	return (
		<header className="auth-header">
			<div className="auth-header-logo">
				<img
					src={signozBrandLogoUrl}
					alt="SigNoz"
					className="auth-header-logo-icon"
				/>
				{/* <span className="auth-header-logo-text">SigNoz</span> */}
			</div>
			<Button
				className="auth-header-help-button"
				prefix={<LifeBuoy size={12} />}
				onClick={handleGetHelp}
				variant="solid"
				color="none"
			>
				Get Help
			</Button>
		</header>
	);
}

export default AuthHeader;
