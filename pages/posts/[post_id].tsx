import { useRouter } from "next/router";
import React from "react";

const Posts = () => {
    const router = useRouter();
    const { post_id } = router.query;
    return <div>{post_id}</div>;
};

export default Posts;
