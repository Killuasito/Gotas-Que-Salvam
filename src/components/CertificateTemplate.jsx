import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// Importe a imagem da assinatura (ajuste o caminho conforme necessário)
import assinatura from "../assets/assinatura.png";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    backgroundColor: "#ffffff",
  },
  border: {
    border: "15px solid #2563EB",
    padding: 20,
    margin: 10,
    height: "90%",
  },
  innerBorder: {
    border: "2px solid #2563EB",
    padding: 20,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2563EB",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 24,
    marginBottom: 50,
    color: "#444",
    textAlign: "center",
  },
  name: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 30,
    color: "#2563EB",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  content: {
    fontSize: 18,
    lineHeight: 1.8,
    textAlign: "center",
    color: "#444",
    paddingHorizontal: 40,
  },
  contentTop: {
    fontSize: 18,
    marginBottom: 15,
    lineHeight: 1.8,
    textAlign: "center",
    color: "#444",
    paddingHorizontal: 40,
  },
  contentBottom: {
    fontSize: 18,
    marginTop: 15,
    lineHeight: 1.8,
    textAlign: "center",
    color: "#444",
    paddingHorizontal: 40,
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    marginTop: 20,
    color: "#444",
    textAlign: "center",
  },
  logo: {
    width: 120,
    marginBottom: 20,
  },
  signature: {
    width: 150,
    marginTop: 50,
    marginBottom: 10,
  },
  signatureImage: {
    width: 150,
    height: 60,
    objectFit: "contain",
  },
});

const CertificateTemplate = ({ name, date, course, semester }) => (
  <Document>
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.border}>
        <View style={styles.innerBorder}>
          <Text style={styles.header}>Certificado</Text>

          <Text style={styles.contentTop}>Certificamos que</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.contentBottom}>
            participou do Sarau FICS, com carga horária de
            3 horas, realizada em {date}
            {course
              ? `. Representando o curso de ${course} - ${semester} semestre`
              : "."}
          </Text>

          {/* Substitua a View da assinatura pela Image */}
          <View style={styles.signature}>
            <Image src={assinatura} style={styles.signatureImage} />
          </View>
          <Text style={styles.signatureText}>(Milton) Coordenador do Curso de ADM</Text>

          <Text style={styles.footer}>
            Certificado registrado sob o número:{" "}
            {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default CertificateTemplate;
