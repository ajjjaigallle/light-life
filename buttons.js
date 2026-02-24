let cState = {
    adv: false,
    sta: false,
    prf: false,
    sec: true,
    nos: false
};

function validate() {
    const ck = document.cookie.split(';').find(c => c.trim().startsWith('usr'));
    return ck !== undefined;
}

function persist(st) {
    const vals = [
        st.adv ? '1' : '0',
        st.sta ? '1' : '0',
        st.prf ? '1' : '0',
        st.sec ? '1' : '0',
        st.nos ? '1' : '0'
    ].join(',');
    const exp = new Date();
    exp.setFullYear(exp.getFullYear() + 1);
    document.cookie = `usr_3ef=${vals}; expires=${exp.toUTCString()}; path=/; SameSite=Lax`;
}

function reveal() {
    const pp = document.getElementById('cookieConsentPopup');
    pp.classList.add('show');
}

function closePopup() {
    const pp = document.getElementById('cookieConsentPopup');
    pp.classList.add('hide');
    setTimeout(() => {
        pp.classList.remove('show', 'hide');
        pp.style.display = 'none';
    }, 400);
}

document.addEventListener('DOMContentLoaded', () => {
    let scrolled = false;
    
    const handleScroll = () => {
        if (!scrolled && !validate()) {
            scrolled = true;
            reveal();
            window.removeEventListener('scroll', handleScroll);
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    document.getElementById('acceptAllBtn').addEventListener('click', () => {
        cState.adv = true;
        cState.sta = true;
        cState.prf = true;
        cState.nos = false;
        persist(cState);
        closePopup();
    });
    
    document.getElementById('declineAllBtn').addEventListener('click', () => {
        cState.adv = false;
        cState.sta = false;
        cState.prf = false;
        cState.nos = false;
        persist(cState);
        closePopup();
    });
    
    document.getElementById('savePreferencesBtn').addEventListener('click', () => {
        cState.adv = document.getElementById('advertisingToggle').checked;
        cState.sta = document.getElementById('statisticsToggle').checked;
        cState.prf = document.getElementById('preferencesToggle').checked;
        cState.nos = document.getElementById('dataSaleOptOut').checked;
        persist(cState);
        closePopup();
    });
    
    const pBtn = document.getElementById('cookiePolicyBtn');
    const pTip = document.getElementById('cookiePolicyTooltip');
    
    pBtn.addEventListener('mouseenter', () => {
        pTip.style.display = 'block';
        pTip.classList.add('show');
    });
    
    pBtn.addEventListener('mouseleave', () => {
        pTip.classList.remove('show');
        setTimeout(() => {
            pTip.style.display = 'none';
        }, 200);
    });
});