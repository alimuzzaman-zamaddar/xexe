import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface DynamicPageData {
  page_title: string;
  page_content: string;
}

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<DynamicPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPage = async () => {
      try {
        const res = await fetch(
          `https://admin.xeltrasoftware.com/api/dynamic-pages/single/${slug}`
        );
        const result = await res.json();

        if (result.status) {
          setPage(result.data);
        } else {
          setPage(null);
        }
      } catch (error) {
        console.error(error);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (!page) {
    return <p className="text-center py-20">Page not found</p>;
  }

  return (
    <section className="py-16 px-4 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
          {page.page_title}
        </h1>

        <div
          className="space-y-6 text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.page_content }}
        />
      </div>
    </section>
  );
};

export default DynamicPage;
