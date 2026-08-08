(() => {
  'use strict';

  const qaItems = [
    ['هل تفصلون الخزائن حسب المقاس؟', 'نعم، يتم تنفيذ الخزائن وفق أبعاد المساحة واحتياج التخزين، مع توزيع داخلي عملي واختيار تفاصيل تتناسب مع الاستخدام والتصميم العام للمكان في الرياض.'],
    ['هل تنفذون غرف ملابس كاملة؟', 'ننفذ غرف ملابس بتقسيمات مخصصة للتعليق والأدراج والرفوف، مع الاستفادة من الزوايا والارتفاعات لتوفير مساحة تخزين منظمة ومريحة للاستخدام اليومي.'],
    ['هل يمكن تفصيل أثاث غرف النوم؟', 'نقدم أعمال نجارة لغرف النوم حسب المساحة، وتشمل حلول التخزين والعناصر الخشبية التي يمكن تنسيقها بصريًا لتكوين غرفة عملية ومتجانسة.'],
    ['هل لديكم حلول لغرف الأطفال؟', 'نعم، يمكن تنفيذ خزائن ووحدات تخزين وأعمال خشبية لغرف الأطفال مع مراعاة استغلال المساحة وسهولة الاستخدام والانسجام مع احتياجات الغرفة.'],
    ['ما المقصود بتفصيل غرف العبايات؟', 'هي حلول تخزين مصممة للعبايات والملابس الطويلة والإكسسوارات، مع مساحات تعليق وتقسيمات تساعد على ترتيب المحتويات بشكل واضح وسهل الوصول.'],
    ['هل تنفذون أبوابًا خشبية؟', 'ننفذ أعمال الأبواب الخشبية بما يتوافق مع المقاسات والطابع الداخلي للموقع، مع الاهتمام بتناسق التصميم والتشطيب مع بقية العناصر الخشبية.'],
    ['هل تقدمون ديكورًا جداريًا خشبيًا؟', 'نعم، نقدم حلول ديكور جداري وكسوات خشبية تضيف دفئًا بصريًا للمجالس وغرف المعيشة والمداخل، ويتم اختيار التصميم بما يناسب أبعاد الجدار وطابع المكان.'],
    ['هل تصلحون الأثاث الخشبي؟', 'نقدم صيانة وتصليحًا للأثاث بحسب حالته، مثل معالجة عدم الثبات أو بعض الأجزاء المتضررة وتحسين الوظيفة العامة للقطعة متى كان الإصلاح مناسبًا.'],
    ['هل الخدمة متاحة داخل الرياض؟', 'نخدم العملاء داخل مدينة الرياض، ويمكن إرسال موقع المشروع وتفاصيل المطلوب عبر واتساب لتوضيح نطاق العمل ونوع الخدمة قبل بدء التنسيق.'],
    ['كيف أبدأ طلب عرض أو استفسار؟', 'أرسل نوع العمل، الحي، المقاسات التقريبية إن توفرت، وصور المساحة عند الإمكان عبر واتساب. هذه المعلومات تساعد على فهم الطلب والتنسيق بشكل أسرع وأكثر دقة.']
  ];

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const storedTheme = localStorage.getItem('hezma-theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemDark ? 'dark' : 'light');

  const setTheme = (theme) => {
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle?.setAttribute('aria-label', theme === 'dark' ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الليلي');
  };

  setTheme(initialTheme);
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('hezma-theme', next);
    setTheme(next);
  });

  const qaList = document.getElementById('qaList');
  const answerPanel = document.getElementById('assistantAnswer');
  if (qaList && answerPanel) {
    qaItems.forEach(([question, answer], index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'qa-button';
      button.textContent = question;
      button.setAttribute('aria-pressed', 'false');
      button.dataset.index = String(index);
      button.addEventListener('click', () => {
        qaList.querySelectorAll('.qa-button').forEach((item) => item.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        answerPanel.textContent = answer;
        answerPanel.hidden = false;
      });
      qaList.appendChild(button);
    });
  }

  const overlay = document.getElementById('assistantOverlay');
  const dialog = document.getElementById('assistantDialog');
  const openButton = document.getElementById('openAssistant');
  const closeButton = document.getElementById('closeAssistant');
  let lastFocusedElement = null;

  const getFocusable = () => dialog ? Array.from(dialog.querySelectorAll('button, textarea, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled')) : [];

  const openAssistant = () => {
    if (!overlay || !dialog) return;
    lastFocusedElement = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      overlay.classList.add('is-open');
      dialog.focus({ preventScroll: true });
    });
  };

  const closeAssistant = () => {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    window.setTimeout(() => {
      overlay.hidden = true;
      if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true });
    }, 220);
  };

  openButton?.addEventListener('click', openAssistant);
  closeButton?.addEventListener('click', closeAssistant);
  overlay?.addEventListener('click', (event) => {
    if (event.target === overlay) closeAssistant();
  });

  document.addEventListener('keydown', (event) => {
    if (!overlay || overlay.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAssistant();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const message = document.getElementById('assistantMessage');
  const sendWhatsApp = document.getElementById('sendWhatsApp');
  sendWhatsApp?.addEventListener('click', () => {
    if (!message) return;
    const cleanText = message.value
      .replace(/[\u0000-\u001F\u007F]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 1200);

    if (!cleanText) {
      message.focus();
      message.setAttribute('aria-invalid', 'true');
      message.placeholder = 'اكتب طلبك أولًا، مثال: أحتاج تفصيل خزائن في حي المصيف...';
      return;
    }

    message.removeAttribute('aria-invalid');
    const url = `https://wa.me/966570834375?text=${encodeURIComponent(cleanText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const year = document.getElementById('currentYear');
  if (year) year.textContent = String(new Date().getFullYear());
})();
