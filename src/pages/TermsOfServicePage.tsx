import type { Theme } from '../types';

export function TermsOfServicePage({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';

  return (
    <div className={`py-16 md:py-24 max-w-4xl mx-auto px-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
      <h1 className={`text-4xl font-extrabold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
        Terms of Service
      </h1>
      <p className="text-sm opacity-60 mb-8 font-medium">Effective Date: May 26, 2026</p>

      <div className="space-y-8 leading-relaxed">
        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or using our website, documentation, and UI components library (collectively, "Gliph UI"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using this site.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            2. Intellectual Property & Open Source License
          </h2>
          <p>
            All components, code snippets, and widgets provided on Gliph UI are licensed under the MIT License unless stated otherwise. You are permitted to copy, modify, distribute, and integrate the components into your own personal or commercial mobile applications.
          </p>
          <p className="mt-2">
            However, the website structure, logos, design templates, and visual assets are copyright of Gliph UI and may not be reproduced without prior written permission.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            3. Disclaimer of Warranty
          </h2>
          <p className="italic">
            GLIPH UI IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            4. User Conduct
          </h2>
          <p>
            You agree not to use Gliph UI for any unlawful purpose or to post any content that violates third-party rights. You agree not to attempt to reverse engineer, disrupt, or bypass the security mechanisms of our hosting providers, package registers, or sandbox frames.
          </p>
        </section>

        <section className="border-b pb-8 border-zinc-200 dark:border-zinc-800">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            5. Modifications to Service
          </h2>
          <p>
            We reserve the right to modify, suspend, or discontinue Gliph UI (or any part of it) at any time without notice. We are not liable to you or any third party for any changes, price updates, or termination of services.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
            6. Governing Law
          </h2>
          <p>
            Any claim relating to Gliph UI shall be governed by the laws of the operating jurisdiction without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </div>
  );
}
