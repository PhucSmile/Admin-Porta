import { Link } from 'react-router-dom';
import { StyledBreadcrumb, StyledBreadcrumbItem } from 'styles/overrides';

export const HeaderBreadcrumb = ({ items = [] }) => {
  return (
    <StyledBreadcrumb>
      {items?.map((item) => (
        <StyledBreadcrumbItem key={item.key}>
          {item?.url ? <Link to={item.url}>{item.label}</Link> : item.label}
        </StyledBreadcrumbItem>
      ))}
    </StyledBreadcrumb>
  );
};
