const WHATSAPP_NUMBER = '595992588770';

export const createWhatsAppUrl = (message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const createProductInquiryMessage = (productName: string): string => {
  return `Hola, quiero consultar por ${productName}. ¿Me pueden ayudar?`;
};

export const openWhatsApp = (message: string): void => {
  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
};

export { WHATSAPP_NUMBER };
