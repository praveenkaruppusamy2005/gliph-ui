import type { Theme } from '../types';

export function PrivacyPolicyPage({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`py-16 md:py-24 max-w-4xl mx-auto px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
      <h1 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
        Privacy Policy
      </h1>
      <p className="text-sm opacity-60 mb-8 font-medium">Effective Date: May 26, 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <p className="text-lg">
            At Gliph UI, accessible from gliph-ui.vercel.app, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Gliph UI and how we use it.
          </p>
          <p className="mt-4">
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            1. Consent
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            2. Information We Collect
          </h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p className="mt-2">
            If you contact us directly, we may receive additional information about you such as your name, email address, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            3. Google DoubleClick DART Cookie
          </h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. 
          </p>
          <p className="mt-2">
            However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            4. Our Advertising Partners
          </h2>
          <p>
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 font-semibold">
            <li>Google AdSense</li>
          </ul>
          <p className="mt-4">
            These third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Gliph UI, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p className="mt-2 text-rose-500 font-bold">
            Note that Gliph UI has no access to or control over these cookies that are used by third-party advertisers.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            5. Third Party Privacy Policies
          </h2>
          <p>
            Gliph UI's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p className="mt-2">
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            6. GDPR Data Protection Rights
          </h2>
          <p>
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            7. Children's Information
          </h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p className="mt-2">
            Gliph UI does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>
      </div>
    </div>
  );
}
