
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArticleDetail from "./pages/ArticleDetail";
import "./utils/scrollbar-hide.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/local" element={<Index />} />
          <Route path="/business" element={<Index />} />
          <Route path="/culture" element={<Index />} />
          <Route path="/tech" element={<Index />} />
          <Route path="/news/:slug" element={<ArticleDetail />} />
          <Route path="/search" element={<Index />} />
          <Route path="/sources" element={<Index />} />
          <Route path="/sources/:sourceId" element={<Index />} />
          <Route path="/contribute" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
