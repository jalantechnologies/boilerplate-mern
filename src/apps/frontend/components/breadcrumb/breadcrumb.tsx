import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="text-title-md2 font-semibold text-black dark:text-white">
      {pageName}
    </div>
    <div>
      <div className="flex items-center gap-2">
        <div>
          <Link className="font-medium" to="/">
            Dashboard /
          </Link>
        </div>
        <div className="font-medium text-primary">{pageName}</div>
      </div>
    </div>
  </div>
);

export default Breadcrumb;
