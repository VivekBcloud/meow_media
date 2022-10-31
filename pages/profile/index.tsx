import { withPageAuth } from "@supabase/auth-helpers-nextjs";

export default function Profile({}) {
    return <div>Hello </div>;
}

export const getServerSideProps = withPageAuth({ redirectTo: "/signin" });
