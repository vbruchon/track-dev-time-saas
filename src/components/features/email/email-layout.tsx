import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  pixelBasedPreset,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
  baseUrl?: string;
  preview: string;
}

const baseUrl = "https://track-dev-time.dev";
export const EmailLayout = ({ children, preview }: EmailLayoutProps) => {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              primary: "#009e33",
            },
          },
        },
      }}
    >
      <Html>
        <Head />
        <Body className="font-sans">
          <Preview>{preview}</Preview>
          <Container
            className="mx-auto p-[20px_25px_48px]"
            style={{
              backgroundImage: `
  radial-gradient(
    circle at bottom right,
    rgba(0, 158, 51, 0.6) 0%,
    rgba(0, 154, 49, 0.3) 20%,
    rgba(34, 197, 94, 0.1) 40%,
    #ffffff 90%
  )
`,
            }}
          >
            <Img
              src={`${baseUrl}/logo_with_name.png`}
              width={200}
              height={50}
              alt="track-dev-time logo"
              style={{
                objectFit: "contain",
                display: "block",
                maxWidth: "100%",
                height: "auto",
              }}
            />
            {children}
            <Hr className="border-forground mt-12" />
            <Text className="text-sm text-gray-500">
              This is an automated notification from Track Dev Time please no
              reply.
            </Text>
            <Img
              src={`${baseUrl}/logo_with_name.png`}
              width={150}
              height={50}
              alt="track-dev-time logo"
              style={{
                objectFit: "contain",
                display: "block",
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};
export default EmailLayout;
