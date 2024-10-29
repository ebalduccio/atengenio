// src/components/layout/footer.tsx
import Link from "next/link"
import { Container } from "./Container"
import { 
  BrainCircuitIcon, 
  LinkedinIcon, 
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon
} from "@/components/icons"

const footerLinks = {
  produto: [
    { label: "Recursos", href: "#features" },
    // { label: "Integrações", href: "#" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "Preços", href: "#pricing" },
    // { label: "Atualizações", href: "#" },
  ],
  // empresa: [
  //   { label: "Sobre", href: "#" },
  //   { label: "Blog", href: "#" },
  //   { label: "Carreiras", href: "#" },
  //   { label: "Imprensa", href: "#" },
  //   { label: "Parceiros", href: "#" },
  // ],
  // suporte: [
  //   { label: "Central de Ajuda", href: "#" },
  //   { label: "Documentação", href: "#" },
  //   // { label: "Status", href: "#" },
  //   // { label: "API", href: "#" },
  //   // { label: "Comunidade", href: "#" },
  // ],
  // legal: [
  //   { label: "Termos de Uso", href: "#" },
  //   { label: "Privacidade", href: "#" },
  //   { label: "Cookies", href: "#" },
  //   // { label: "Licenças", href: "#" },
  //   // { label: "Segurança", href: "#" },
  // ],
} as const

const socialLinks = [
  { Icon: LinkedinIcon, href: "#", label: "LinkedIn" },
  { Icon: TwitterIcon, href: "#", label: "Twitter" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
] as const

export function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-900">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Coluna da Marca */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
                  <BrainCircuitIcon className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                AtenGênio
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
              Transforme seu atendimento com inteligência artificial. 
              Automatize agendamentos, melhore a satisfação dos clientes e 
              impulsione seus resultados.
            </p>
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:contato@atende.ai" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <MailIcon className="h-4 w-4" />
                contato@agende.com
              </a>
              <a href="tel:+551199999999" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <PhoneIcon className="h-4 w-4" />
                (71) 99348-8260
              </a>
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                Salvador, BA
              </p>
            </div>
          </div>

          {/* Colunas de Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé com Copyright e Social */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 AtendeGênio. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              {/* {socialLinks.map(({ Icon, href, label }) => (
                <Link 
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))} */}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}