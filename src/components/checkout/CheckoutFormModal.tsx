import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface CheckoutFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { 
        email: string; 
        whatsapp: string;
        customerId: string;  // Adicionado customerId
    }) => Promise<void>;
    planName: string;
    planPrice: string;
    isAnnual: boolean;
    setupFee: number;
    planId: string;
}

export function CheckoutFormModal({
    isOpen,
    onClose,
    onSubmit,
    planName,
    planPrice,
    isAnnual,
    setupFee,
    planId
}: CheckoutFormModalProps) {
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const formatWhatsApp = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 11) {
            return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        }
        return numbers.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhatsapp(formatWhatsApp(e.target.value));
    };

    const saveToFirebase = async (data: {
        email: string;
        whatsapp: string;
        planId: string;
        planName: string;
        planPrice: string;
        isAnnual: boolean;
        setupFee: number;
    }) => {
        try {
            const customersRef = collection(db, 'customers');
            const docRef = await addDoc(customersRef, {
                ...data,
                status: 'pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error saving to Firebase:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !whatsapp) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos.",
                variant: "destructive",
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                title: "Erro",
                description: "Por favor, insira um email válido.",
                variant: "destructive",
            });
            return;
        }

        if (whatsapp.replace(/\D/g, '').length < 11) {
            toast({
                title: "Erro",
                description: "Por favor, insira um número de WhatsApp válido.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            // Salva no Firebase e obtém o ID do documento
            const customerId = await saveToFirebase({
                email,
                whatsapp,
                planId,
                planName,
                planPrice,
                isAnnual,
                setupFee
            });

            // Chama a função onSubmit passando também o customerId
            await onSubmit({ 
                email, 
                whatsapp,
                customerId  // Incluindo o customerId no onSubmit
            });

            // Fecha o modal após o sucesso
            onClose();

            // Mostra mensagem de sucesso
            toast({
                title: "Sucesso!",
                description: "Redirecionando para o checkout...",
            });

        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Erro",
                description: "Houve um erro ao processar sua solicitação. Tente novamente.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Complete seus dados</DialogTitle>
                    <DialogDescription>
                        Preencha as informações abaixo para prosseguir com a compra do plano {planName}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp</Label>
                        <Input
                            id="whatsapp"
                            type="tel"
                            placeholder="(11) 98888-8888"
                            value={whatsapp}
                            onChange={handleWhatsAppChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="border-t pt-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Plano {planName}</span>
                                <span>{planPrice}/{isAnnual ? 'ano' : 'mês'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxa de implementação</span>
                                <span>{formatCurrency(setupFee)}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-2 border-t">
                                <span>Total primeiro pagamento</span>
                                <span>{formatCurrency(parseFloat(planPrice.replace(/[^\d,]/g, '').replace(',', '.')) + setupFee)}</span>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <span className="animate-spin">⚪</span>
                                Processando...
                            </div>
                        ) : (
                            "Continuar para pagamento"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}