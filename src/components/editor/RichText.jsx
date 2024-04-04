import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Editable, withReact, Slate } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { Element } from './Element';
import { Leaf } from './Leaf';
import { Toolbar } from './Elements/Toolbar';
import { withEmbeds, withLinks } from './plugins';
import {
  useGeneralSettingNote,
  useUpdateGeneralSettingNote,
} from 'api/generalSettingApi';

const StyledRichText = styled.div`
  border: 1px solid var(--gray300);
  border-radius: 2px;

  .toolbar {
    padding: 7px 12px;
    border-bottom: 1px solid var(--gray300);

    > button {
      padding: 0;
      border: none;

      &[ant-click-animating-without-extra-node='true']::after,
      .ant-click-animating-node {
        content: none;
      }
    }
  }

  .editor {
    min-height: 120px !important;
    padding: 12px;
  }
`;

export const RichText = () => {
  const editor = useMemo(
    () => withHistory(withEmbeds(withLinks(withReact(createEditor())))),
    [],
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const { data = [], isLoading } = useGeneralSettingNote();
  const updateGeneralSettingNoteMutation = useUpdateGeneralSettingNote();

  const handleChange = _.debounce((value) => {
    const content = JSON.stringify(value);

    updateGeneralSettingNoteMutation.mutate({ content });
  }, 500);

  if (isLoading) {
    return null;
  }

  return (
    <StyledRichText>
      <Slate editor={editor} value={data} onChange={handleChange}>
        <Toolbar />

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="editor"
          placeholder="Nhập ghi chú"
        />
      </Slate>
    </StyledRichText>
  );
};
