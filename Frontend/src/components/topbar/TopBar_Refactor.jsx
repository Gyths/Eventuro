import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoB.svg";

/**
 * Props:
 * - isLoggedIn: boolean
 * - onSearch(query), onFiltersChange({category, dateFrom, dateTo, location})
 * - onLogin(), onRegister(), onProfile(), onMyTickets(), onClaims(), onLogout()
 */

export default function TopBarRefactor({ children }) {
  const paymentPageRoute = "/pago";
  const disabledPaths = [paymentPageRoute];
  const navigate = useNavigate();

  /*const [filters, setFilters] = useState({ //evitaamos duplicar estaado
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });*/

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.12)]"
      style={{
        background:
          "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
      }}
    >
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Eventuro"
            className="h-8 w-auto cursor-pointer"
            onClick={() => {
              !disabledPaths.includes(location.pathname) && navigate("/home");
            }}
          />
        </div>
      </div>
      {children}
    </header>
  );
}
