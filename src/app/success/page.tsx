import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 bg-green-100 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-800">Compra Realizada com Sucesso!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-gray-600">
                        Obrigado pela sua compra. Seu pedido foi recebido e está sendo processado.
                    </p>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-700 mb-2">Próximo Passo: Personalização</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Em breve, nossa equipe entrará em contato via WhatsApp para entender melhor as necessidades específicas da sua empresa.
                            Vamos coletar informações importantes para treinar a inteligência artificial de acordo com seu segmento, processos e objetivos,
                            garantindo assim uma solução perfeitamente adaptada ao seu negócio.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-gray-700">O Que Esperar:</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Truck className="w-4 h-4" />
                            <span>Você receberá um email de confirmação em breve.</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/">
                        <Button>Voltar ao Início</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}