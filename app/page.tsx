'use client';

import React from 'react';
import ChatBox from '@/components/chat';
import PageContainer from '@/components/page-conteiner';

export default function Home() {
  return (
    <PageContainer>
      <ChatBox />
    </PageContainer>
  );
}