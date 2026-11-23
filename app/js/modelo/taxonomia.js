// Temas, sentimento e gravidade. Documentação: docs/04-taxonomia.md
// Fase 1: regras fixas de palavras-chave. Rever as listas com a equipa da Colibri.

export const TEMAS = [
  { nome: 'Serviço/Atendimento', origem: 'voc', palavras: ['atendimento', 'funcionári', 'simpát', 'mal trat', 'staff', 'balcão'] },
  { nome: 'Zona de refeição', origem: 'voc', palavras: ['mesa', 'lugar livre', 'barulho', 'ar condicionado'] },
  { nome: 'Instalações sanitárias', origem: 'voc', palavras: ['casa de banho', 'casas de banho', 'wc', 'sanitár', 'secador', 'papel'] },
  { nome: 'Produtos', origem: 'voc', palavras: ['prateleira', 'stock', 'promoção', 'produto'] },
  { nome: 'Chegada e estacionamento', origem: 'voc', palavras: ['estacion', 'lugares', 'camiões', 'autocaravana', 'sinalética'] },
  { nome: 'Alimentação e bebidas', origem: 'voc', palavras: ['sandes', 'café', 'sopa', 'comida', 'refeição', 'pastéis', 'vegetarian'] },
  { nome: 'Caixa e pagamento', origem: 'voc', palavras: ['caixa', 'cartão', 'multibanco', 'mb way', 'cobra'] },
  { nome: 'Máquinas de vending', origem: 'voc', palavras: ['máquina', 'vending', 'moedas'] },
  { nome: 'Espaços infantis', origem: 'voc', palavras: ['infantil', 'baloiço', 'muda-fraldas', 'crianças'] },
  { nome: 'Serviço Pega e Leva', origem: 'voc', palavras: ['pega e leva'] },
  { nome: 'Produtos não alimentares', origem: 'voc', palavras: ['revista', 'brinquedo', 'acessório'] },
  { nome: 'Serviço Colibri Express', origem: 'voc', palavras: ['express'] },
  { nome: 'Preço', origem: 'reclamacoes', palavras: ['preço', '€', 'caro', 'abuso'] },
  { nome: 'Reembolsos e faturação', origem: 'reclamacoes', palavras: ['reembolso', 'fatura', 'nif', 'talão', 'devolu'] },
];
export const TEMA_OUTROS = 'Outros';

// Categorias do Jira → tema. Atualizar quando houver o export real.
const CATEGORIAS_JIRA = {
  'atendimento': 'Serviço/Atendimento',
  'instalações': 'Instalações sanitárias',
  'pagamentos': 'Caixa e pagamento',
  'faturação': 'Reembolsos e faturação',
  'reembolsos': 'Reembolsos e faturação',
  'vending': 'Máquinas de vending',
  'restauração': 'Alimentação e bebidas',
  'estacionamento': 'Chegada e estacionamento',
};

const PALAVRAS_RISCO = ['deco', 'advogad', 'tribunal', 'burla', 'acidente', 'feri', 'intoxica', 'livro de reclamações'];
const PALAVRAS_POSITIVAS = ['adoro', 'excelente', 'obrigad', 'recomendo', 'muito bom', 'impecável'];
const PALAVRAS_NEGATIVAS = ['não ', 'mau', 'sujo', 'sujas', 'avariad', 'fechad', 'demor', 'errad', 'caro', 'ocupad', 'por limpar', 'nunca'];

const norm = s => String(s ?? '').toLowerCase();

export function classificarTema(texto) {
  const t = norm(texto);
  const tema = TEMAS.find(x => x.palavras.some(p => t.includes(p)));
  return tema ? tema.nome : TEMA_OUTROS;
}

export function temaDaCategoriaJira(categoria, texto) {
  return CATEGORIAS_JIRA[norm(categoria)] ?? classificarTema(texto);
}

export function sentimentoPorEstrelas(estrelas) {
  if (estrelas <= 2) return 'negativo';
  if (estrelas === 3) return 'neutro';
  return 'positivo';
}

export function sentimentoPorTexto(texto) {
  const t = norm(texto);
  if (PALAVRAS_POSITIVAS.some(p => t.includes(p))) return 'positivo';
  if (PALAVRAS_NEGATIVAS.some(p => t.includes(p))) return 'negativo';
  return 'neutro';
}

export function temRisco(texto) {
  const t = norm(texto);
  return PALAVRAS_RISCO.some(p => t.includes(p));
}

/** Gravidade a partir do sentimento, das estrelas e de palavras de risco. */
export function classificarGravidade({ sentimento, estrelas = null, texto = '', prioridade = null }) {
  if (temRisco(texto) || estrelas === 1 || norm(prioridade) === 'alta') return 'alta';
  if (sentimento !== 'negativo') return 'baixa';
  if (norm(prioridade) === 'baixa') return 'baixa';
  return 'media';
}
