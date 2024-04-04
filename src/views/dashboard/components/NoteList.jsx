import React from 'react';
import styled from 'styled-components';
import { StyledSpace } from 'styles/overrides';

const NoteListStyle = styled.div`
  margin-top: 16px;
  .ant-space-item {
    width: 100%;
    ul.note-list {
      display: flex;
      justify-content: center;
      gap: 22px;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        .title {
          font-weight: 400;
          font-size: 12px;
          line-height: 150%;
          color: #5a657c;
        }
        .circle-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
      }
    }
  }
`;

export default function NoteList({ noteList }) {
  return (
    <NoteListStyle>
      <StyledSpace size={16}>
        <ul className="note-list">
          {noteList?.map((item, index) => {
            return (
              <li key={index}>
                <div
                  className="circle-color"
                  style={{ background: `${item.bg}` }}
                ></div>
                <p className="title">{item.title}</p>
              </li>
            );
          })}
        </ul>
      </StyledSpace>
    </NoteListStyle>
  );
}
