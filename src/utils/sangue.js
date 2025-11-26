// Função que retorna os tipos de sangue compatíveis para o tipo informado
export function tiposQuePodeReceber(tipo) {
  const tabela = {
    "A+": ["A+", "A-", "O+", "O-"],
    "A-": ["A-", "O-"],

    "B+": ["B+", "B-", "O+", "O-"],
    "B-": ["B-", "O-"],

    "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "AB-": ["A-", "B-", "AB-", "O-"],

    "O+": ["O+", "O-"],
    "O-": ["O-"],
  };

  return tabela[tipo] || [];
}
